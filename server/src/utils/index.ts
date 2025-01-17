import { TextDocument } from "vscode-languageserver-textdocument";
import { TextDocumentIdentifier } from "vscode-languageserver-protocol";
import path from "path";
import { URI } from "vscode-uri";
import { runningOnWindows } from "./operatingSystem";

export function getUriFromDocument(
  document: TextDocument | TextDocumentIdentifier
): string {
  return decodeUriAndRemoveFilePrefix(document.uri);
}

export function toUnixStyle(uri: string) {
  return uri.replace(/\\/g, "/");
}

export function lowercaseDriveLetter(uri: string) {
  return uri.replace(/^\/?\w+:/, (match) => match.toLowerCase());
}

export function decodeUriAndRemoveFilePrefix(uri: string): string {
  if (runningOnWindows() && uri && uri.includes("file:///")) {
    uri = uri.replace("file:///", "");
  } else if (uri && uri.includes("file://")) {
    uri = uri.replace("file://", "");
  }

  if (uri) {
    uri = decodeURIComponent(uri);
  }

  uri = uri.replace(/\\/g, "/");

  return lowercaseDriveLetter(uri);
}

export function toUri(filePath: string) {
  return URI.file(filePath).toString();
}

export function isCharacterALetter(char: string): boolean {
  return /[a-zA-Z]/.test(char);
}

export function isCharacterANumber(char: string): boolean {
  return /[0-9]/.test(char);
}

export function uriEquals(uri1: string, uri2: string) {
  return runningOnWindows()
    ? uri1.toLowerCase() === uri2.toLowerCase()
    : uri1 === uri2;
}

export function normalizeSlashes(p: string) {
  return path.sep === "\\" ? p.replace(/\\/g, "/") : p;
}

export function isTestMode() {
  return process.env.VSCODE_NODE_ENV === "development";
}
