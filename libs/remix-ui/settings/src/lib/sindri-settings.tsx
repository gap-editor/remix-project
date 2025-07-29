import { CopyToClipboard } from '@remix-ui/clipboard'
import { CustomTooltip } from '@remix-ui/helper'
import React, { useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { SindriSettingsProps } from '../types'
import { sindriAccessTokenLink } from './constants'

export function SindriSettings(props: SindriSettingsProps) {
  const [sindriToken, setSindriToken] = useState<string>('')
  const intl = useIntl()

  useEffect(() => {
    if (props.config) {
      const sindriToken = props.config.get('settings/sindri-access-token') || ''
      setSindriToken(sindriToken)
    }
  }, [props.config])

  const handleChangeTokenState = (event) => {
    const token = event.target.value ? event.target.value.trim() : event.target.value
    setSindriToken(token)
  }

  // api key settings
  const saveSindriToken = () => {
    props.saveToken(sindriToken)
  }

  const removeToken = () => {
    setSindriToken('')
    props.removeToken()
  }

  return (
    <>
      <p className="mb-1">
        <FormattedMessage id="settings.sindriAccessTokenText" />
      </p>
      <p className="mb-1">
        <a href={sindriAccessTokenLink} target="_blank" rel="noopener noreferrer" className="text-primary">{intl.formatMessage({ id: 'settings.gitAccessTokenText2' })}</a> <FormattedMessage id="settings.sindriAccessTokenText2" />
      </p>
      <div className="text-secondary my-2">
        <input
          id="sindriaccesstoken"
          data-id="settingsTabSindriAccessToken"
          type="password"
          className="form-control"
          onChange={(e) => handleChangeTokenState(e)}
          value={sindriToken}
          placeholder={intl.formatMessage({ id: 'settings.token' })}
        />
        <div className="d-flex pt-3">
          <input
            className="btn btn-sm btn-primary"
            id="savesindritoken"
            data-id="settingsTabSaveSindriToken"
            onClick={saveSindriToken}
            value={intl.formatMessage({ id: 'settings.save' })}
            type="button"
          ></input>
          {/* <CustomTooltip tooltipText={<FormattedMessage id="settings.deleteSindriCredentials" />} tooltipClasses="text-nowrap" tooltipId="removesindritokenTooltip" placement="top-start">
              <button className="btn btn-sm btn-secondary ml-2" id="removesindritoken" data-id="settingsTabRemoveSindriToken" onClick={removeToken}>
                <FormattedMessage id="settings.remove" />
              </button>
            </CustomTooltip> */}
        </div>
      </div>
    </>
  )
}
