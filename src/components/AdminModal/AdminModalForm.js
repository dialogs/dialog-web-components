/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Set } from 'immutable';
import type {
  Group,
  GroupType,
  GroupMemberPermission,
} from '@dlghq/dialog-types';
import type { Permission } from './types';
import React, { PureComponent, type Node } from 'react';
import { hasPermission } from '../../utils/acl';
import AdminModalSwitcher from './AdminModalSwitcher';
import Fieldset from '../Fieldset/Fieldset';
import styles from './AdminModal.css';

type PermissionConfig = {
  type: GroupMemberPermission,
  label: string,
  danger?: ?boolean,
  hintYes?: ?string,
  hintNo?: ?string,
};

type Props = {
  id: string,
  uid: number,
  group: Group,
  permissions: Set<Permission>,
  renderOrder: { [type: GroupType]: PermissionConfig[] },
  onChange: (permissions: Set<Permission>) => mixed,
  onSubmit: () => mixed,
};

class AdminModalForm extends PureComponent<Props> {
  static defaultProps = {
    id: 'form_admin',
    renderOrder: {
      group: [
        { type: 'kick', label: 'AdminModal.kick' },
        { type: 'invite', label: 'AdminModal.invite' },
        { type: 'update_info', label: 'AdminModal.group.update_info' },
        { type: 'edit_shortname', label: 'AdminModal.group.edit_shortname' },
        {
          type: 'get_integration_token',
          label: 'AdminModal.get_integration_token',
        },
        { type: 'edit_message', label: 'AdminModal.edit_message' },
        { type: 'delete_message', label: 'AdminModal.delete_message' },
        {
          type: 'set_permissions',
          label: 'AdminModal.set_permissions',
          hintYes: 'AdminModal.set_permissions_hint.yes',
          hintNo: 'AdminModal.set_permissions_hint.no',
        },
      ],
      channel: [
        { type: 'invite', label: 'AdminModal.invite' },
        { type: 'update_info', label: 'AdminModal.channel.update_info' },
        { type: 'edit_shortname', label: 'AdminModal.channel.edit_shortname' },
        {
          type: 'get_integration_token',
          label: 'AdminModal.get_integration_token',
        },
        { type: 'send_message', label: 'AdminModal.send_message' },
        { type: 'edit_message', label: 'AdminModal.edit_message' },
        { type: 'delete_message', label: 'AdminModal.delete_message' },
        {
          type: 'set_permissions',
          label: 'AdminModal.set_permissions',
          hintYes: 'AdminModal.set_permissions_hint.yes',
          hintNo: 'AdminModal.set_permissions_hint.no',
        },
      ],
    },
  };

  handleSubmit = (event: SyntheticEvent<>) => {
    event.preventDefault();
    this.props.onSubmit();
  };

  handleChange = (value: boolean, event: SyntheticInputEvent<>) => {
    const permission = event.target.name;

    if (value) {
      this.props.onChange(this.props.permissions.add(permission));
    } else {
      this.props.onChange(this.props.permissions.delete(permission));
    }
  };

  renderSwitchers(): Node {
    const { id, uid, group, permissions, renderOrder } = this.props;
    const transferOwnership = permissions.has('transfer_ownership');
    const order = renderOrder[group.type];
    if (!order) {
      return null;
    }

    return order
      .filter((config) => hasPermission(uid, group, config.type))
      .map((config) => {
        return (
          <AdminModalSwitcher
            key={config.type}
            id={id}
            type={config.type}
            label={config.label}
            danger={config.danger}
            hintYes={config.hintYes}
            hintNo={config.hintNo}
            value={permissions.has(config.type)}
            disabled={transferOwnership}
            onChange={this.handleChange}
          />
        );
      });
  }

  renderOwnershipTransfering() {
    const { id, uid, group, permissions } = this.props;
    if (uid !== group.adminId) {
      return null;
    }

    return (
      <Fieldset
        legend="AdminModal.transfer_ownership_legend"
        className={styles.fieldset}
      >
        <AdminModalSwitcher
          danger
          id={id}
          type="transfer_ownership"
          label={`AdminModal.${group.type}.transfer_ownership`}
          value={permissions.has('transfer_ownership')}
          onChange={this.handleChange}
        />
      </Fieldset>
    );
  }

  render() {
    const { id } = this.props;

    return (
      <form className={styles.form} id={id} onSubmit={this.handleSubmit}>
        <Fieldset legend="AdminModal.legend" className={styles.fieldset}>
          {this.renderSwitchers()}
        </Fieldset>
        {this.renderOwnershipTransfering()}
      </form>
    );
  }
}

export default AdminModalForm;
