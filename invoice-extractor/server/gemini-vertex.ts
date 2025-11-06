import { VertexAI } from "@google-cloud/vertexai";
import type { LineItem } from "@shared/schema";

// Initialize Vertex AI with Google Cloud credentials from environment
// Require proper credentials for production use
if (!process.env.GOOGLE_CLOUD_CREDENTIALS) {
  console.error(
    "\n❌ GOOGLE_CLOUD_CREDENTIALS environment variable is missing!\n" +
    "Please provide your Google Cloud service account JSON credentials.\n" +
    "The application will start but invoice extraction will not work.\n"
  );
}

let projectId: string = "";
let location: string = "";
let credentials: any = null;
let vertexAI: VertexAI | null = null;

if (process.env.GOOGLE_CLOUD_CREDENTIALS) {
  try {
    credentials = JSON.parse(process.env.GOOGLE_CLOUD_CREDENTIALS);
    
    if (!credentials.project_id) {
      console.error(
        "\n❌ GOOGLE_CLOUD_CREDENTIALS is missing 'project_id' field!\n" +
        "Please provide complete service account credentials.\n"
      );
    } else {
      projectId = credentials.project_id;
      location = process.env.GOOGLE_CLOUD_LOCATION || "us-central1";
      
      console.log(`✅ Vertex AI configuration: project=${projectId}, location=${location}`);
      
      try {
        vertexAI = new VertexAI({
          project: projectId,
          location: location,
          googleAuthOptions: {
            credentials: credentials,
          },
        });
        
        console.log(`✅ Vertex AI initialized successfully with Gemini 2.5 Flash`);
      } catch (error) {
        console.error("❌ Failed to initialize Vertex AI:", error);
        vertexAI = null;
      }
    }
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error(
        "\n❌ GOOGLE_CLOUD_CREDENTIALS contains invalid JSON!\n" +
        "Please check the format of your credentials.\n"
      );
    } else {
      console.error("❌ Error parsing credentials:", error);
    }
  }
}

// Using Gemini 2.5 Flash via Vertex AI
// Note: Model name may vary by region and availability
const model = "gemini-2.5-flash";

export interface ExtractedInvoiceData {
  invoiceNumber?: string;
  invoiceDate?: string; // German format DD.MM.YYYY
  dueDate?: string; // Payment due date: DD.MM.YYYY
  supplierName?: string;
  supplierAddress?: string;
  supplierVatId?: string;
  customerName?: string; // Customer/bill-to name
  customerAddress?: string; // Customer/bill-to address
  paymentTerms?: string; // e.g., "Net 30", "Due on receipt"
  subtotal?: string;
  vatRate?: string;
  vatAmount?: string;
  totalAmount?: string;
  lineItems?: LineItem[];
}

export async function extractInvoiceData(
  fileData: string,
  mimeType: string
): Promise<ExtractedInvoiceData> {
  // Check if Vertex AI is properly initialized
  if (!vertexAI) {
    throw new Error(
      "Vertex AI ist nicht konfiguriert. Bitte setzen Sie GOOGLE_CLOUD_CREDENTIALS mit gültigen Google Cloud Service Account Zugangsdaten."
    );
  }
  
  if (!fileData || !mimeType) {
    throw new Error("Dateidaten oder MIME-Typ fehlen");
  }
  
  try {
    const generativeModel = vertexAI.getGenerativeModel({
      model: model,
    });

    // Remove data URL prefix if present
    const base64Data = fileData.replace(/^data:.*?;base64,/, "");
    
    if (!base64Data || base64Data.length === 0) {
      throw new Error("Ungültige Dateidaten - Base64-Dekodierung fehlgeschlagen");
    }

    const prompt = `You are an expert in extracting invoice data from invoices in any language (German, English, etc.).
Analyze this invoice document and extract the following information in JSON format:

{
  "invoiceNumber": "Invoice number (e.g. RE-2024-001, INV-12345)",
  "invoiceDate": "Invoice date in DD.MM.YYYY format",
  "dueDate": "Payment due date in DD.MM.YYYY format (if present)",
  "supplierName": "Supplier/vendor name",
  "supplierAddress": "Complete supplier address",
  "supplierVatId": "VAT ID or tax number if present (e.g. DE123456789, GB123456789)",
  "customerName": "Customer/bill-to name (if present)",
  "customerAddress": "Customer/bill-to address (if present)",
  "paymentTerms": "Payment terms (e.g. 'Net 30', 'Due on receipt', 'Zahlung binnen 30 Tagen')",
  "subtotal": "Net amount/subtotal as decimal number (e.g. 1234.56)",
  "vatRate": "VAT/tax rate as number (e.g. 19 for 19%, 20 for 20%)",
  "vatAmount": "VAT/tax amount as decimal number (e.g. 234.56)",
  "totalAmount": "Total/gross amount as decimal number (e.g. 1469.12)",
  "lineItems": [
    {
      "description": "Item description",
      "quantity": quantity as number,
      "unitPrice": "Unit price as string (e.g. '12.50 €', '$15.00')",
      "total": "Line total as string (e.g. '25.00 €', '$30.00')"
    }
  ]
}

Important instructions:
- ALL monetary amounts as decimal numbers with DOT (not comma) - e.g. 1234.56
- Dates in DD.MM.YYYY format regardless of original format
- If a field is not found, set it to null
- Extract ALL line items from the invoice
- Extract customer information (bill-to) if present on the invoice
- Extract payment due date and payment terms if visible
- CRITICAL: For multi-page documents, focus on the FIRST PAGE with the main invoice
- Ignore attachments or additional pages, but check page 1 thoroughly for all fields
- Relevant data (amounts, line items, supplier, customer, payment info) is usually on page 1
- Works for invoices in ANY language (German, English, French, etc.)

CRITICAL OUTPUT REQUIREMENTS:
- Respond ONLY with valid JSON object
- Do NOT include any markdown code blocks (no code fences)
- Do NOT include any explanatory text before or after the JSON
- Do NOT include any comments or notes
- Start your response with { and end with }
- Ensure all JSON brackets and braces are properly balanced
- Ensure all strings are properly escaped and quoted

Example of correct output format:
{"invoiceNumber":"RE-2024-001","invoiceDate":"01.01.2024",...}`;

    const request = {
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                mimeType: mimeType,
                data: base64Data,
              },
            },
            {
              text: prompt,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 4096,
        // responseMimeType is optional - helps ensure JSON output
        // If unsupported by the model version, the prompt will ensure JSON output
        responseMimeType: "application/json",
      } as any, // Type assertion for compatibility with different Vertex AI SDK versions
    };

    const response = await generativeModel.generateContent(request);
    const result = response.response;
    
    if (!result || !result.candidates || result.candidates.length === 0) {
      throw new Error("Keine Antwort vom KI-Modell erhalten");
    }

    const candidate = result.candidates[0];
    if (!candidate.content || !candidate.content.parts || candidate.content.parts.length === 0) {
      throw new Error("Leere Antwort vom KI-Modell");
    }

    const textResponse = candidate.content.parts[0].text || "";
    
    if (!textResponse || textResponse.trim().length === 0) {
      throw new Error("KI-Modell hat keinen Text zurückgegeben");
    }
    
    // Clean response text (remove markdown code blocks if present)
    let jsonText = textResponse.trim();
    jsonText = jsonText.replace(/^```(?:json)?\s*/gm, "").replace(/```\s*$/gm, "");
    
    // Parse JSON directly - responseMimeType: "application/json" should guarantee valid JSON
    try {
      const extractedData = JSON.parse(jsonText) as ExtractedInvoiceData;
      
      console.log(`✅ Successfully extracted invoice data:`, {
        invoiceNumber: extractedData.invoiceNumber || 'N/A',
        supplierName: extractedData.supplierName || 'N/A',
        totalAmount: extractedData.totalAmount || 'N/A'
      });
      
      return extractedData;
    } catch (parseError) {
      console.error("❌ JSON parsing failed:", parseError);
      console.error("Raw response from AI (first 1000 chars):", jsonText.substring(0, 1000));
      throw new Error(`KI-Antwort war kein gültiges JSON: ${parseError instanceof Error ? parseError.message : String(parseError)}`);
    }
  } catch (error) {
    console.error("Error extracting invoice data:", error);
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes("quota")) {
        throw new Error("API-Quota überschritten. Bitte versuchen Sie es später erneut.");
      }
      if (error.message.includes("permission")) {
        throw new Error("Keine Berechtigung für Vertex AI. Überprüfen Sie die Service Account Rechte.");
      }
      throw new Error(`Extraktion fehlgeschlagen: ${error.message}`);
    }
    throw new Error(`Extraktion fehlgeschlagen: ${String(error)}`);
  }
}

// German VAT ID validation (basic format check)
export function validateGermanVatId(vatId: string): boolean {
  if (!vatId) return false;
  
  // German VAT ID format: DE + 9 digits
  const dePattern = /^DE\d{9}$/;
  
  // Also accept EU VAT IDs
  const euPattern = /^[A-Z]{2}\d{8,12}$/;
  
  return dePattern.test(vatId.replace(/\s/g, "")) || euPattern.test(vatId.replace(/\s/g, ""));
}
