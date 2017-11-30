/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Field, Group, GroupMember, GroupMemberPermission } from '@dlghq/dialog-types';
import type { Permission } from './types';
import { Set } from 'immutable';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import { MemberSelectorState, type SelectorState } from '../../entities';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import ModalBody from '../Modal/ModalBody';
import ModalHeader from '../Modal/ModalHeader';
import ModalClose from '../Modal/ModalClose';
import ModalFooter from '../Modal/ModalFooter';
import AdminModalUser from './AdminModalUser';
import AdminModalForm from './AdminModalForm';
import AdminModalUserList from './AdminModalUserList/AdminModalUserList';
import AdminModalUserSearch from './AdminModalUserSearch/AdminModalUserSearch';
import styles from './AdminModal.css';

type Props = {
  className?: string,
  uid: number,
  group: Group,
  members: GroupMember[],
  action: Field<void>,
  onAddAdmin: (gid: number, uid: number, permissions: GroupMemberPermission[]) => mixed,
  onTransferOwnership: (gid: number, uid: number) => mixed,
  onClose: () => mixed
};

type State = {
  selector: SelectorState<GroupMember>,
  permissions: Set<Permission>
};

class AdminModal extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selector: MemberSelectorState.create(props.members),
      permissions: Set()
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.members !== nextProps.members) {
      this.setState({
        selector: this.state.selector.replaceItems(nextProps.members)
      });
    }
  }

  handleCancel = () => {
    this.setState({
      selector: this.state.selector.clearSelection(),
      permissions: this.state.permissions.clear()
    });
  };

  handleSubmit = () => {
    const { group } = this.props;
    const member = this.getSelectedMember();
    if (member) {
      if (this.state.permissions.has('transfer_ownership')) {
        this.props.onTransferOwnership(group.id, member.peerInfo.peer.id);
      } else {
        this.props.onAddAdmin(group.id, member.peerInfo.peer.id, this.state.permissions.toArray());
      }
    }
  };

  handleChange = (selector: SelectorState<GroupMember>) => {
    const member = selector.getSelected().first();
    if (member) {
      this.setState({ selector, permissions: Set(member.permissions) });
    } else {
      this.setState({ selector });
    }
  };

  handlePermissionsChange = (permissions: Set<Permission>) => {
    this.setState({ permissions });
  };

  getSelectedMember(): ?GroupMember {
    return this.state.selector.getSelected().first();
  }

  getSubmitLabel(): string {
    const { group } = this.props;
    if (this.state.permissions.has('transfer_ownership')) {
      return `AdminModal.submit.transfer.${group.type}`;
    }

    return 'AdminModal.submit.update';
  }

  renderContent() {
    const { uid, group, action } = this.props;
    const member = this.getSelectedMember();

    if (member) {
      return (
        <div>
          <ModalBody className={styles.body}>
            <AdminModalUser user={member} />
            <AdminModalForm
              id="edit_user_permissions"
              uid={uid}
              group={group}
              permissions={this.state.permissions}
              onSubmit={this.handleSubmit}
              onChange={this.handlePermissionsChange}
            />
          </ModalBody>
          <ModalFooter className={styles.footer}>
            <Button
              rounded={false}
              form="edit_user_permissions"
              type="submit"
              theme="success"
              disabled={action.pending}
              className={styles.footerButton}
            >
              <Text id={this.getSubmitLabel()} />
            </Button>
          </ModalFooter>
        </div>
      );
    }

    return (
      <ModalBody className={styles.body}>
        <AdminModalUserSearch selector={this.state.selector} onChange={this.handleChange} />
        <div className={styles.list}>
          <AdminModalUserList selector={this.state.selector} onChange={this.handleChange} />
        </div>
      </ModalBody>
    );
  }

  render() {
    const { action } = this.props;
    const className = classNames(styles.container, this.props.className);
    const member = this.getSelectedMember();

    return (
      <Modal className={className} onClose={this.props.onClose}>
        <ModalHeader withBorder>
          {member ? <Icon glyph="arrow_back" onClick={this.handleCancel} className={styles.back} /> : null}
          <Text id="AdminModal.title" />
          <ModalClose pending={action.pending} onClick={this.props.onClose} />
        </ModalHeader>
        {this.renderContent()}
      </Modal>
    );
  }
}

export default AdminModal;
