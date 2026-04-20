import { ConsoleEmailProvider } from '../emails/providers/console-email.provider.js';
import { renderEmail } from '../emails/renderEmail.js';

export async function runEmailDispatchWorker() {
  const provider = new ConsoleEmailProvider();
  const email = renderEmail('report-ready', {
    reportName: 'Invoice aging',
    recipientName: 'Morgan Lee',
  });

  await provider.send('morgan@clearline.dev', email);
}
