import { Plugin } from '@remixproject/engine'
import { Profile } from '@remixproject/plugin-utils'

export type ProvidersSection = `Injected` | 'Remix VMs' | 'Externals' | 'Remix forked VMs' | 'Forked States'

export type environmentExplorerUIProps = {
  state: {
    providersFlat: { [key: string]: Provider }
    pinnedProviders: string[]
  }
  deleteForkedState (provider: Provider): Promise<void>
  pinStateCallback (provider: Provider, pinned: boolean): Promise<void>
  profile: Profile
}

export type environmentExplorerUIGridSection = {
  title: string
  keywords: string[],
  providers: Provider[]
  filterFn: (provider: Provider) => boolean
  descriptionFn?: (provider: Provider) => string | JSX.Element | null
  id?: string
}

export type environmentExplorerUIGridSections = {
  [key in ProvidersSection]: environmentExplorerUIGridSection
}

export type ProviderConfig = {
  isVM: boolean
  isInjected: boolean
  isRpcForkedState?: boolean
  isVMStateForked?: boolean
  statePath?: string
}

export type Provider = {
  position: number
  options: { [key: string]: string }
  dataId: string
  name: string
  displayName: string
  logo?: string,
  logos?: string[],
  fork: string
  description?: string
  config: ProviderConfig
  title: string
  init: () => Promise<void>
  provider:{
    sendAsync: (payload: any) => Promise<void>
  }
}