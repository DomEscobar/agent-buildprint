export function formatPacketJson(packet) {
  return `${JSON.stringify(packet, null, 2)}\n`;
}
