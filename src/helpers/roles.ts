export const ROLES={
    ADMIN: "admin",
    MANAGER: "manager",
    USER: "user",
    GUEST: "guest"
}

export const PERMISSIONS={
    VIEW_DASHBOARD: "view_dashboard",
    VIEW_TODOS: "view_todos",
    VIEW_SESSIONS: "view_sessions",
    EDIT_SESSION: "edit_session",
    DELETE_SESSION: "delete_session"
}

export const ROLES_PERMISSIONS: Record<string,string[]> = {
    [ROLES.ADMIN]: [
        PERMISSIONS.VIEW_TODOS,
        PERMISSIONS.VIEW_DASHBOARD,
        PERMISSIONS.VIEW_SESSIONS,
        PERMISSIONS.EDIT_SESSION,
        PERMISSIONS.DELETE_SESSION
    ],
    [ROLES.MANAGER]: [
        PERMISSIONS.VIEW_DASHBOARD,
        PERMISSIONS.VIEW_SESSIONS,
        PERMISSIONS.EDIT_SESSION
    ],
    [ROLES.USER]: [
        PERMISSIONS.VIEW_DASHBOARD,
        PERMISSIONS.VIEW_SESSIONS
    ],
    [ROLES.GUEST]: [
        PERMISSIONS.VIEW_DASHBOARD
    ]
}