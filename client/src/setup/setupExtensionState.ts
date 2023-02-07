import * as path from "path";
import { window, env, ExtensionContext, OutputChannel } from "vscode";
import { SentryClientTelemetry } from "../telemetry/SentryClientTelemetry";

import { ExtensionState } from "../types";
import { Logger } from "../utils/Logger";
import { isTelemetryEnabled } from "../utils/telemetry";

export function setupExtensionState(
  context: ExtensionContext,
  { sentryDsn }: { sentryDsn: string }
): ExtensionState {
  const serverModulePath = context.asAbsolutePath(
    path.join("server", "out", "index.js")
  );

  const outputChannel: OutputChannel = window.createOutputChannel("Solidity");
  const commandsOutputChannel: OutputChannel =
    window.createOutputChannel("Solidity Commands");
  const telemetry = new SentryClientTelemetry(sentryDsn);
  const logger = new Logger(outputChannel, telemetry);

  const extensionState: ExtensionState = {
    context,
    env:
      process.env.NODE_ENV === "development"
        ? process.env.NODE_ENV
        : "production",
    version: context.extension.packageJSON.version,
    name: context.extension.packageJSON.name,
    serverModulePath,
    machineId: env.machineId,

    client: null,
    listenerDisposables: [],
    projectsValidationStatus: {},
    telemetryEnabled: isTelemetryEnabled(),
    projectStatusItems: [],

    telemetry,
    outputChannel,
    commandsOutputChannel,
    logger,
    hardhatProjects: [],
  };

  telemetry.init(extensionState);

  return extensionState;
}
