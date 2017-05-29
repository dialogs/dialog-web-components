/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

 type Field<P> = {
   value: P,
   error: ?Error,
   pending: boolean
 };

 export type Props = {
   className?: string,
   appName: string,
   appVersion: string,
   updateState: Field<'upToDate' | 'available'>,
   onCheck: () => any,
   onUpdate: () => any,
   onClose: () => any
 };
