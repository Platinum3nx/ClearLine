export function baseHtmlLayout(title: string, body: string) {
  return '<html><body><h1>' + title + '</h1><div>' + body + '</div></body></html>';
}

export function baseTextLayout(title: string, body: string) {
  return title + '\n\n' + body;
}
