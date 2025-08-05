import { CopyToClipboard } from '@remix-ui/clipboard'
import { CustomTooltip } from '@remix-ui/helper'
import React, { useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { EtherscanSettingsProps } from '../types'
import { etherscanTokenLink } from './constants'

export function EtherscanSettings(props: EtherscanSettingsProps) {
  const [etherscanToken, setEtherscanToken] = useState<string>('')
  const intl = useIntl()

  useEffect(() => {
    if (props.config) {
      const etherscanToken = props.config.get('settings/etherscan-access-token') || ''
      setEtherscanToken(etherscanToken)
    }
  }, [props.config])

  const handleChangeTokenState = (event) => {
    setEtherscanToken(event.target.value)
  }

  // api key settings
  const saveEtherscanToken = () => {
    props.saveToken(etherscanToken)
  }

  const removeToken = () => {
    setEtherscanToken('')
    props.removeToken()
  }

  return (
    <>
      <p className="mb-1">
        <FormattedMessage id="settings.etherscanAccessTokenText" />
      </p>
      <p className="mb-1">
        <a className="text-primary" target="_blank" href={etherscanTokenLink}>
          {intl.formatMessage({ id: 'settings.etherscanAccessTokenText2' })}
        </a> <FormattedMessage id="settings.etherscanAccessTokenText3" />
      </p>
      <div className="text-secondary mt-2 mb-0">
        <input
          id="etherscanAccessToken"
          data-id="settingsTabEtherscanAccessToken"
          type="password"
          className="form-control"
          onChange={(e) => handleChangeTokenState(e)}
          value={etherscanToken}
          placeholder={intl.formatMessage({ id: 'settings.token' })}
        />
      </div>
      <div className="d-flex pt-3">
        <input
          className="btn btn-sm btn-primary"
          id="saveetherscantoken"
          data-id="settingsTabSaveEtherscanToken"
          onClick={saveEtherscanToken}
          value={intl.formatMessage({ id: 'settings.save' })}
          type="button"
        ></input>
      </div>
    </>
  )
}
