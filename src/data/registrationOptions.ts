export const expertiseOptions = ['Video', 'Photo', 'Live Streaming'] as const

export const bankOptions = [
  'Bangkok Bank',
  'Kasikornbank',
  'Siam Commercial Bank',
  'Krungthai Bank',
  'Bank of Ayudhya (Krungsri)',
  'TMBThanachart Bank (ttb)',
  'UOB Bank',
  'Government Savings Bank',
  'Bank for Agriculture and Agricultural Cooperatives (BAAC)',
  'CIMB Thai Bank',
  'Kiatnakin Phatra Bank',
  'TISCO Bank',
  'Land and Houses Bank (LH Bank)',
  'Government Housing Bank (GH Bank)',
  'Other (Please Specify)',
] as const

export const platformOptions = [
  { id: 'facebook', name: 'Facebook', rates: ['Post', 'Video', 'Reel', 'Live'] },
  { id: 'instagram', name: 'Instagram', rates: ['Post', 'Reel', 'Story', 'Live'] },
  { id: 'tiktok', name: 'TikTok', rates: ['Video', 'Story', 'Live'] },
  { id: 'youtube', name: 'YouTube', rates: ['Video', 'Short', 'Live'] },
  { id: 'x', name: 'X', rates: ['Post', 'Video', 'Space'] },
  { id: 'lemon8', name: 'Lemon8', rates: ['Post', 'Video'] },
  { id: 'shopee', name: 'Shopee', rates: ['Video', 'Live'] },
  { id: 'lazada', name: 'Lazada', rates: ['Video', 'Live'] },
] as const

export type PlatformOption = typeof platformOptions[number]
export type PlatformId = PlatformOption['id']
