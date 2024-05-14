import { http } from "@/utils/http";

export type UserResult = {
  success: boolean;
  data: {
    access_token?: string;
    expires: number;
    expires_in?: number;
    /** 头像 */
    avatar: string;
    /** 用户名 */
    username: string;
    /** 昵称 */
    nickname: string;
    /** 当前登录用户的角色 */
    roles: Array<string>;
    /** `token` */
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    accessToken: string;
    refresh_token?: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
  };
};

export type RefreshTokenResult = {
  success: boolean;
  data: {
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: number;
    refresh_token?: string;
    access_token?: string;
    expires_in?: number;
  };
};

export type UserInfo = {
  /** 头像 */
  avatar: string;
  /** 用户名 */
  username: string;
  /** 昵称 */
  nickname: string;
  /** 邮箱 */
  email: string;
  /** 联系电话 */
  phone: string;
  /** 简介 */
  description: string;
};

export type UserInfoResult = {
  success: boolean;
  data: UserInfo;
};

type ResultTable = {
  success: boolean;
  data?: {
    /** 列表数据 */
    list: Array<any>;
    /** 总条目数 */
    total?: number;
    /** 每页显示条目个数 */
    pageSize?: number;
    /** 当前页数 */
    currentPage?: number;
  };
};

/** 登录 */
export const getLogin = (data?: object) => {
  return http.request<UserResult>(
    "post",
    "http://103.139.202.40:8080/api/auth/login",
    { data }
  );
};

/** 刷新`token` */
export const refreshTokenApi = (data?: object) => {
  return http.request<RefreshTokenResult>(
    "get",
    "http://103.139.202.40:8080/api/auth/refreshToken",
    { data }
  );
};

/** 账户设置-个人信息 */
export const getMine = (data?: object) => {
  return http.request<UserInfoResult>(
    "get",
    "http://103.139.202.40:8080/api/auth/checkMe",
    { data }
  );
};

/** 账户设置-个人安全日志 */
export const getMineLogs = (data?: object) => {
  return http.request<ResultTable>("get", "/mine-logs", { data });
};

// Custom
export const getLogout = (data?: object) => {
  return http.request<ResultTable>(
    "get",
    "http://103.139.202.40:8080/api/auth/logout",
    { data }
  );
};
