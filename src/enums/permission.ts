// NOTE: Permission และ PermissionGroupKey ต้องสอดคล้องกัน
export enum PermissionGroupKey {
  ROLE = 'role',
}

export enum Permission {
  // TODO: just example
  // Role
  ROLE_VIEW = 'role.view',
  ROLE_CREATE = 'role.create',
  ROLE_UPDATE = 'role.update',
  ROLE_DELETE = 'role.delete',
}
