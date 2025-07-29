import { CopyToClipboard } from '@remix-ui/clipboard'
import { CustomTooltip } from '@remix-ui/helper'
import React, { useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { GithubSettingsProps } from '../types'
import { gitAccessTokenLink } from './constants'

export function GithubSettings(props: GithubSettingsProps) {
  const [githubToken, setGithubToken] = useState<string>('')
  const [githubUserName, setGithubUsername] = useState<string>('')
  const [githubEmail, setGithubEmail] = useState<string>('')
  const intl = useIntl()

  useEffect(() => {
    if (props.config) {
      const githubToken = props.config.get('settings/gist-access-token') || ''
      const githubUserName = props.config.get('settings/github-user-name') || ''
      const githubEmail = props.config.get('settings/github-email') || ''

      setGithubToken(githubToken)
      setGithubUsername(githubUserName)
      setGithubEmail(githubEmail)
    }
  }, [props.config])

  const handleChangeTokenState = (event) => {
    const token = event.target.value ? event.target.value.trim() : event.target.value
    setGithubToken(token)
  }

  const handleChangeUserNameState = (event) => {
    setGithubUsername(event.target.value)
  }

  const handleChangeEmailState = (event) => {
    setGithubEmail(event.target.value)
  }

  // api key settings
  const saveGithubToken = () => {
    props.saveToken(githubToken, githubUserName, githubEmail)
  }

  const removeToken = () => {
    setGithubToken('')
    setGithubUsername('')
    setGithubEmail('')
    props.removeToken()
  }

  return (
    <>
      <p className="mb-1">
        <FormattedMessage id="settings.gitAccessTokenText" />
      </p>
      <p className="mb-1">
        <a href={gitAccessTokenLink} target="_blank" rel="noopener noreferrer" className="text-primary">{intl.formatMessage({ id: 'settings.gitAccessTokenText2' })}</a> <FormattedMessage id="settings.gitAccessTokenText3" />
      </p>
      <div className="text-secondary my-2">
        <input
          id="gistaccesstoken"
          data-id="settingsTabGistAccessToken"
          type="password"
          className="form-control"
          onChange={(e) => handleChangeTokenState(e)}
          value={githubToken}
          placeholder={intl.formatMessage({ id: 'settings.token' })}
        />
      </div>
      <div className="text-secondary my-2">
        <input
          id="githubusername"
          data-id="settingsTabGithubUsername"
          type="text"
          className="form-control"
          onChange={(e) => handleChangeUserNameState(e)}
          value={githubUserName}
          placeholder={intl.formatMessage({ id: 'settings.username' })}
        />
      </div>
      <div className="text-secondary mt-2 mb-0">
        <input
          id="githubemail"
          data-id="settingsTabGithubEmail"
          type="text"
          className="form-control"
          onChange={(e) => handleChangeEmailState(e)}
          value={githubEmail}
          placeholder={intl.formatMessage({ id: 'settings.email' })}
        />
        <div className="d-flex pt-3">
          <input
            className="btn btn-sm btn-primary"
            id="savegisttoken"
            data-id="settingsTabSaveGistToken"
            onClick={saveGithubToken}
            value={intl.formatMessage({ id: 'settings.save' })}
            type="button"
          ></input>
          {/* <CustomTooltip
              tooltipText={<FormattedMessage id="settings.deleteGithubCredentials" />}
              tooltipClasses="text-nowrap"
              tooltipId="removegisttokenTooltip"
              placement="top-start"
            >
              <button className="btn btn-sm btn-secondary ml-2" id="removegisttoken" data-id="settingsTabRemoveGistToken" onClick={removeToken}>
                <FormattedMessage id="settings.remove" />
              </button>
            </CustomTooltip> */}
        </div>
      </div>
    </>
  )
}
