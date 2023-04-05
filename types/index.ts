export type Collection = {
  id: string;
  platform: string;
  platformAddress: string;
  tokenId: string;
  tokenType: string;
  title: string;
  balance: string;
  description: string;
  tokenUriRaw: string;
  tokenUriGateway: string;
  image: string;
  createdBy: string;
  yearCreated: string;
  mimeType: string;
  mimeUri: string;
  tags: string[];
  timeLastUpdated: Date;
};
