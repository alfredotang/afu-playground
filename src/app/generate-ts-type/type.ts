export type GeneratedType = {
  cryptokiVersion: number
  flags: undefined
  func: string
  installedModule: Array<
    | { description: string; version: string }
    | { version: '1.3.5.1'; description: string }
  >
  last_error: undefined
  libraryDescription: string
  libraryVersion: number
  manufacturerID: string
  ret_code: undefined
  serverVersion: string
  slots: Array<{
    firmwareVersion: undefined
    flags: number
    hardwareVersion: undefined
    manufacturerID: string
    slotDescription: string
    slotID: undefined
    token: {
      certs: Array<
        | {
            certb64: string
            holderRank: string
            id: string
            issuerDN: string
            label: string
            notAfter: string
            notAfterT: number
            notBefore: string
            notBeforeT: number
            signatureAlgorithm: string
            sn: string
            subjectDN: string
            subjectID: string
            thumbprint: string
            usage: string
          }
        | {
            certb64: string
            id: string
            issuerDN: string
            label: string
            notAfter: string
            notAfterT: undefined
            notBefore: string
            notBeforeT: number
            signatureAlgorithm: string
            sn: string
            subjectCN: string
            subjectDN: string
            thumbprint: string
            usage: string
          }
        | {
            certb64: string
            id: string
            issuerDN: string
            label: string
            notAfter: string
            notAfterT: undefined
            notBefore: string
            notBeforeT: number
            signatureAlgorithm: string
            sn: string
            subjectDN: string
            thumbprint: string
            usage: string
          }
      >
      firmwareVersion: number
      flags: number
      hardwareVersion: number
      keys: Array<{
        id: string
        keyb64: string
        label: string
        type: undefined
      }>
      label: string
      manufacturerID: string
      model: string
      serialNumber: string
      ulFreePrivateMemory: number
      ulFreePublicMemory: number
      ulMaxPinLen: number
      ulMaxRwSessionCount: undefined
      ulMaxSessionCount: undefined
      ulMinPinLen: number
      ulSessionCount: undefined
      ulTotalPrivateMemory: number
      ulTotalPublicMemory: number
      utcTime: undefined
    }
  }>
  version: string
}
