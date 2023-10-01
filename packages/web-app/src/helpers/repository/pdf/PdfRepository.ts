import { GeneratePDFRequest } from "@shared/contract/pdf.ts";

export interface PdfRepository {
  download: (travel: GeneratePDFRequest) => Promise<void>;
}
