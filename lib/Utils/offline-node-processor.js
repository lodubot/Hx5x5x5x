"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeOfflineNodeProcessor = void 0;

const makeOfflineNodeProcessor = (nodeProcessorMap, ws, onUnexpectedError, yieldToEventLoop) => {
    const nodes = [];
    let isProcessing = false;
    const BATCH_SIZE = 10;
    const enqueue = (type, node) => {
        nodes.push({ type: type, node: node });
        if (isProcessing) {
            return;
        }
        isProcessing = true;
        const promise = async () => {
            let processedInBatch = 0;
            while (nodes.length && ws.isOpen) {
                const { type: type, node: node } = nodes.shift();
                const nodeProcessor = nodeProcessorMap.get(type);
                if (!nodeProcessor) {
                    onUnexpectedError(
                        new Error(`unknown offline node type: ${type}`),
                        "processing offline node"
                    );
                    continue;
                }
                await nodeProcessor(node);
                processedInBatch++;
                if (processedInBatch >= BATCH_SIZE) {
                    processedInBatch = 0;
                    await yieldToEventLoop();
                }
            }
            isProcessing = false;
        };
        promise().catch((error) => onUnexpectedError(error, "processing offline nodes"));
    };
    return { enqueue: enqueue };
};

exports.makeOfflineNodeProcessor = makeOfflineNodeProcessor;
