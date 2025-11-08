import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { ArrowLeft, FileText, CheckCircle, XCircle, AlertCircle, Loader2, ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PDFPreview } from "@/components/pdf-preview";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import type { Invoice } from "@shared/schema";
import { useState } from "react";

export default function InvoiceDetail() {
  const params = useParams<{ id: string }>();
  const invoiceId = params.id;
  const [isInvoiceInfoOpen, setIsInvoiceInfoOpen] = useState(false);
  const [isFinancialOpen, setIsFinancialOpen] = useState(false);

  const { data: invoice, isLoading } = useQuery<Invoice>({
    queryKey: ["/api/invoices", invoiceId],
    enabled: !!invoiceId,
    refetchInterval: (query) => {
      const data = query.state.data as Invoice | undefined;
      // Auto-refresh every 2 seconds if invoice is processing
      return data?.status === 'processing' ? 2000 : false;
    },
  });

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="h-8 w-48 bg-muted rounded animate-pulse" />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="h-96 bg-muted rounded animate-pulse" />
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="h-4 w-full bg-muted rounded animate-pulse" />
                  <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Rechnung nicht gefunden</h3>
            <Link href="/history">
              <Button variant="outline" className="mt-4">
                Zurück zur Historie
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getVatValidationBadge = (status: string | null) => {
    switch (status) {
      case "valid":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800">
            <CheckCircle className="h-3 w-3" />
            Gültig
          </Badge>
        );
      case "invalid":
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3" />
            Ungültig
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            Nicht geprüft
          </Badge>
        );
    }
  };

  return (
    <div className="p-3 md:p-6 space-y-4 md:space-y-6 max-w-full overflow-x-hidden">
      <div className="flex items-center gap-2 md:gap-4">
        <Link href="/history">
          <Button variant="outline" size="icon" data-testid="button-back">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="min-w-0 flex-1">
          <h1 className="text-xl md:text-3xl font-bold tracking-tight text-foreground break-words" data-testid="text-invoice-title">
            {invoice.invoiceNumber || "Rechnung Details"}
          </h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base break-words truncate">{invoice.fileName}</p>
        </div>
      </div>

      {invoice.status === "processing" && (
        <Card className="border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/10">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-yellow-600 dark:text-yellow-400" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100">
                  KI extrahiert Rechnungsdaten...
                </h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                  Dies dauert in der Regel nur 2-5 Sekunden. Die Seite wird automatisch aktualisiert.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Rechnungsvorschau</CardTitle>
            </CardHeader>
            <CardContent className="p-2 md:p-6">
              <div className="w-full max-w-full overflow-hidden">
                {invoice.fileType.startsWith("image/") ? (
                  <img
                    src={invoice.fileData}
                    alt={invoice.fileName}
                    className="w-full h-auto max-w-full mx-auto rounded-lg border"
                    data-testid="img-invoice-preview"
                    style={{ maxWidth: '100%', height: 'auto', width: '100%' }}
                  />
                ) : invoice.fileType === "application/pdf" ? (
                  <div className="w-full max-w-full overflow-x-hidden">
                    <PDFPreview 
                      fileData={invoice.fileData}
                      fileName={invoice.fileName}
                      className="w-full max-w-full"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-96 bg-muted/30 rounded-lg border">
                    <div className="text-center">
                      <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Vorschau nicht verfügbar</p>
                      <p className="text-xs text-muted-foreground mt-1">{invoice.fileName}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {invoice.lineItems && invoice.lineItems.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Rechnungspositionen</CardTitle>
              </CardHeader>
              <CardContent className="p-2 md:p-6">
                <div className="border rounded-lg overflow-x-auto overflow-y-hidden" style={{ WebkitOverflowScrolling: 'touch' }}>
                  <table className="w-full min-w-[500px] md:min-w-full">
                    <thead className="bg-muted/50 border-b sticky top-0">
                      <tr>
                        <th className="text-left p-2 md:p-3 text-xs md:text-sm font-medium whitespace-nowrap">Beschreibung</th>
                        <th className="text-right p-2 md:p-3 text-xs md:text-sm font-medium whitespace-nowrap min-w-[60px]">Menge</th>
                        <th className="text-right p-2 md:p-3 text-xs md:text-sm font-medium whitespace-nowrap min-w-[80px]">Einzelpreis</th>
                        <th className="text-right p-2 md:p-3 text-xs md:text-sm font-medium whitespace-nowrap min-w-[80px]">Gesamt</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoice.lineItems.map((item, index) => (
                        <tr key={index} className="border-b last:border-0">
                          <td className="p-2 md:p-3 text-xs md:text-sm break-words" style={{ maxWidth: '200px' }}>{item.description}</td>
                          <td className="p-2 md:p-3 text-xs md:text-sm text-right tabular-nums whitespace-nowrap">{item.quantity}</td>
                          <td className="p-2 md:p-3 text-xs md:text-sm text-right tabular-nums whitespace-nowrap">{item.unitPrice}</td>
                          <td className="p-2 md:p-3 text-xs md:text-sm text-right tabular-nums font-medium whitespace-nowrap">{item.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Desktop: Always visible Invoice Info */}
        <div className="hidden lg:block lg:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Rechnungsinformationen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {invoice.invoiceNumber && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Rechnungsnummer</p>
                  <p className="font-medium break-words" data-testid="text-invoice-number">{invoice.invoiceNumber}</p>
                </div>
              )}
              {invoice.invoiceDate && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Datum</p>
                  <p className="font-medium break-words">{invoice.invoiceDate}</p>
                </div>
              )}
              {invoice.supplierName && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Lieferant</p>
                  <p className="font-medium break-words">{invoice.supplierName}</p>
                </div>
              )}
              {invoice.supplierAddress && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Adresse</p>
                  <p className="text-sm break-words whitespace-pre-line">{invoice.supplierAddress}</p>
                </div>
              )}
              {invoice.supplierVatId && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">USt-IdNr.</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-medium font-mono text-sm break-all">{invoice.supplierVatId}</p>
                    {getVatValidationBadge(invoice.vatValidated)}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Finanzübersicht</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {invoice.subtotal && (
                <div className="flex justify-between items-center gap-2 min-w-0">
                  <p className="text-xs md:text-sm text-muted-foreground flex-shrink-0">Zwischensumme</p>
                  <p className="font-medium tabular-nums text-sm md:text-base truncate text-right">
                    {parseFloat(invoice.subtotal).toLocaleString("de-DE", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </p>
                </div>
              )}
              {invoice.vatRate && invoice.vatAmount && (
                <div className="flex justify-between items-center gap-2 min-w-0">
                  <p className="text-xs md:text-sm text-muted-foreground flex-shrink-0">MwSt. ({invoice.vatRate}%)</p>
                  <p className="font-medium tabular-nums text-sm md:text-base truncate text-right">
                    {parseFloat(invoice.vatAmount).toLocaleString("de-DE", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </p>
                </div>
              )}
              {invoice.totalAmount && (
                <>
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center gap-2 min-w-0">
                      <p className="font-semibold text-sm md:text-base flex-shrink-0">Gesamtsumme</p>
                      <p className="text-lg md:text-2xl font-bold tabular-nums truncate text-right" data-testid="text-total-amount">
                        {parseFloat(invoice.totalAmount).toLocaleString("de-DE", {
                          style: "currency",
                          currency: "EUR",
                        })}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {invoice.status === "error" && invoice.errorMessage && (
            <Card className="border-destructive">
              <CardHeader>
                <CardTitle className="text-destructive">Fehler</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-destructive break-words">{invoice.errorMessage}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Mobile: Collapsible Invoice Info */}
        <div className="lg:hidden">
          <Collapsible open={isInvoiceInfoOpen} onOpenChange={setIsInvoiceInfoOpen}>
            <Card>
              <CollapsibleTrigger className="w-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardTitle>Rechnungsinformationen</CardTitle>
                  <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isInvoiceInfoOpen ? 'transform rotate-180' : ''}`} />
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="space-y-4 pt-0">
                  {invoice.invoiceNumber && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Rechnungsnummer</p>
                      <p className="font-medium break-words" data-testid="text-invoice-number">{invoice.invoiceNumber}</p>
                    </div>
                  )}
                  {invoice.invoiceDate && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Datum</p>
                      <p className="font-medium break-words">{invoice.invoiceDate}</p>
                    </div>
                  )}
                  {invoice.supplierName && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Lieferant</p>
                      <p className="font-medium break-words">{invoice.supplierName}</p>
                    </div>
                  )}
                  {invoice.supplierAddress && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Adresse</p>
                      <p className="text-sm break-words whitespace-pre-line">{invoice.supplierAddress}</p>
                    </div>
                  )}
                  {invoice.supplierVatId && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">USt-IdNr.</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-medium font-mono text-sm break-all">{invoice.supplierVatId}</p>
                        {getVatValidationBadge(invoice.vatValidated)}
                      </div>
                    </div>
                  )}
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          <Collapsible open={isFinancialOpen} onOpenChange={setIsFinancialOpen}>
            <Card className="mt-4">
              <CollapsibleTrigger className="w-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardTitle>Finanzübersicht</CardTitle>
                  <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isFinancialOpen ? 'transform rotate-180' : ''}`} />
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="space-y-3 pt-0">
                  {invoice.subtotal && (
                    <div className="flex justify-between items-center gap-2 min-w-0">
                      <p className="text-xs text-muted-foreground flex-shrink-0">Zwischensumme</p>
                      <p className="font-medium tabular-nums text-sm truncate text-right">
                        {parseFloat(invoice.subtotal).toLocaleString("de-DE", {
                          style: "currency",
                          currency: "EUR",
                        })}
                      </p>
                    </div>
                  )}
                  {invoice.vatRate && invoice.vatAmount && (
                    <div className="flex justify-between items-center gap-2 min-w-0">
                      <p className="text-xs text-muted-foreground flex-shrink-0">MwSt. ({invoice.vatRate}%)</p>
                      <p className="font-medium tabular-nums text-sm truncate text-right">
                        {parseFloat(invoice.vatAmount).toLocaleString("de-DE", {
                          style: "currency",
                          currency: "EUR",
                        })}
                      </p>
                    </div>
                  )}
                  {invoice.totalAmount && (
                    <>
                      <div className="border-t pt-3">
                        <div className="flex justify-between items-center gap-2 min-w-0">
                          <p className="font-semibold text-sm flex-shrink-0">Gesamtsumme</p>
                          <p className="text-lg font-bold tabular-nums truncate text-right" data-testid="text-total-amount">
                            {parseFloat(invoice.totalAmount).toLocaleString("de-DE", {
                              style: "currency",
                              currency: "EUR",
                            })}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {invoice.status === "error" && invoice.errorMessage && (
            <Card className="border-destructive mt-4">
              <CardHeader>
                <CardTitle className="text-destructive">Fehler</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-destructive break-words">{invoice.errorMessage}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
