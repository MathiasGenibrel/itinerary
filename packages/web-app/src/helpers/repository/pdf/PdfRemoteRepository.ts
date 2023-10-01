import { PdfRepository } from "./PdfRepository.ts";
import { GeneratePDFRequest } from "@shared/contract/pdf.ts";

export class PdfRemoteRepository implements PdfRepository {
  private readonly serviceURL = "http://localhost:5001";

  public async download(travel: GeneratePDFRequest): Promise<void> {
    const blob = await this.fetcher("/api/map/generate-map", {
      method: "POST",
      body: JSON.stringify(travel),
    });

    this.saveFile(travel.name, blob);
  }

  private saveFile(filename: string, blob: Blob) {
    const blobURL = URL.createObjectURL(blob);

    // Create a link, to download file
    const a = document.createElement("a");
    a.href = blobURL;
    a.download = filename;

    // Start download
    a.click();

    URL.revokeObjectURL(blobURL);
  }

  private async fetcher(endpoint: string, payload?: RequestInit) {
    const response = await fetch(this.serviceURL + endpoint, {
      ...payload,
      headers: { ...payload?.headers, "Content-Type": "application/json" },
    });

    return await response.blob();
  }
}
