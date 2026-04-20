export async function runWorker(handler: () => Promise<void>) {
  await handler();
  return { ran: true };
}

