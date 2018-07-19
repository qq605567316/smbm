<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<%@ page import="com.tt.entity.Manager" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<c:set value="${pageContext.request.contextPath }" var="path"/>
<%
    Manager manager = (Manager) request.getSession().getAttribute("manager");
    if (manager == null) {
        // 重定向到新地址
        String site = new String("/user/exit");
        response.setStatus(response.SC_MOVED_TEMPORARILY);
        response.setHeader("Location", site);
    }
%>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Amaze UI Admin index Examples</title>
    <meta name="description" content="这是一个 index 页面">
    <meta name="keywords" content="index">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="renderer" content="webkit">
    <meta http-equiv="Cache-Control" content="no-siteapp"/>
    <link rel="icon" type="image/png" href="${path}/resources/i/favicon.png">
    <link rel="apple-touch-icon-precomposed" href="${path}/resources/i/app-icon72x72@2x.png">
    <meta name="apple-mobile-web-app-title" content="Amaze UI"/>
    <script src="${path}/resources/js/echarts.min.js"></script>
    <link rel="stylesheet" href="${path}/resources/css/amazeui.min.css"/>
    <link rel="stylesheet" href="${path}/resources/css/amazeui.datatables.min.css"/>
    <link rel="stylesheet" href="${path}/resources/css/app.css">
    <script src="${path}/resources/js/jquery.min.js"></script>

</head>

<body data-type="widgets">
<script src="${path}/resources/js/theme.js"></script>
<div class="am-g tpl-g">
    <!-- 头部 -->
    <header>
        <!-- logo -->
        <div class="am-fl tpl-header-logo">
            <a href="javascript:;"><img src="${path}/resources/img/logo.png" alt=""></a>
        </div>
        <!-- 右侧内容 -->
        <div class="tpl-header-fluid">
            <!-- 侧边切换 -->
            <div class="am-fl tpl-header-switch-button am-icon-list">
                    <span>

                </span>
            </div>
            <!-- 搜索 -->
            <div class="am-fl tpl-header-search">
                <form class="tpl-header-search-form" action="javascript:;">
                    <button class="tpl-header-search-btn am-icon-search"></button>
                    <input class="tpl-header-search-box" type="text" placeholder="搜索内容...">
                </form>
            </div>
            <!-- 其它功能-->
            <div class="am-fr tpl-header-navbar">
                <ul>
                    <!-- 欢迎语 -->
                    <li class="am-text-sm tpl-header-navbar-welcome">
                        <a href="javascript:;">欢迎你, <span><%= manager.getMname()%></span> </a>
                    </li>

                    <!-- 新邮件 -->
                    <li class="am-dropdown tpl-dropdown" data-am-dropdown>
                        <a href="javascript:;" class="am-dropdown-toggle tpl-dropdown-toggle" data-am-dropdown-toggle>
                            <i class="am-icon-envelope"></i>
                            <span class="am-badge am-badge-success am-round item-feed-badge">4</span>
                        </a>
                        <!-- 弹出列表 -->
                        <ul class="am-dropdown-content tpl-dropdown-content">
                            <li class="tpl-dropdown-menu-messages">
                                <a href="javascript:;" class="tpl-dropdown-menu-messages-item am-cf">
                                    <div class="menu-messages-ico">
                                        <img src="${path}/resources/img/user04.png" alt="">
                                    </div>
                                    <div class="menu-messages-time">
                                        3小时前
                                    </div>
                                    <div class="menu-messages-content">
                                        <div class="menu-messages-content-title">
                                            <i class="am-icon-circle-o am-text-success"></i>
                                            <span>夕风色</span>
                                        </div>
                                        <div class="am-text-truncate"> Amaze UI 的诞生，依托于 GitHub 及其他技术社区上一些优秀的资源；Amaze UI
                                            的成长，则离不开用户的支持。
                                        </div>
                                        <div class="menu-messages-content-time">2016-09-21 下午 16:40</div>
                                    </div>
                                </a>
                            </li>

                            <li class="tpl-dropdown-menu-messages">
                                <a href="javascript:;" class="tpl-dropdown-menu-messages-item am-cf">
                                    <div class="menu-messages-ico">
                                        <img src="${path}/resources/img/user02.png" alt="">
                                    </div>
                                    <div class="menu-messages-time">
                                        5天前
                                    </div>
                                    <div class="menu-messages-content">
                                        <div class="menu-messages-content-title">
                                            <i class="am-icon-circle-o am-text-warning"></i>
                                            <span>禁言小张</span>
                                        </div>
                                        <div class="am-text-truncate"> 为了能最准确的传达所描述的问题， 建议你在反馈时附上演示，方便我们理解。</div>
                                        <div class="menu-messages-content-time">2016-09-16 上午 09:23</div>
                                    </div>
                                </a>
                            </li>
                            <li class="tpl-dropdown-menu-messages">
                                <a href="javascript:;" class="tpl-dropdown-menu-messages-item am-cf">
                                    <i class="am-icon-circle-o"></i> 进入列表…
                                </a>
                            </li>
                        </ul>
                    </li>

                    <!-- 新提示 -->
                    <li class="am-dropdown" data-am-dropdown>
                        <a href="javascript:;" class="am-dropdown-toggle" data-am-dropdown-toggle>
                            <i class="am-icon-bell"></i>
                            <span class="am-badge am-badge-warning am-round item-feed-badge">5</span>
                        </a>

                        <!-- 弹出列表 -->
                        <ul class="am-dropdown-content tpl-dropdown-content">
                            <li class="tpl-dropdown-menu-notifications">
                                <a href="javascript:;" class="tpl-dropdown-menu-notifications-item am-cf">
                                    <div class="tpl-dropdown-menu-notifications-title">
                                        <i class="am-icon-line-chart"></i>
                                        <span> 有6笔新的销售订单</span>
                                    </div>
                                    <div class="tpl-dropdown-menu-notifications-time">
                                        12分钟前
                                    </div>
                                </a>
                            </li>
                            <li class="tpl-dropdown-menu-notifications">
                                <a href="javascript:;" class="tpl-dropdown-menu-notifications-item am-cf">
                                    <div class="tpl-dropdown-menu-notifications-title">
                                        <i class="am-icon-star"></i>
                                        <span> 有3个来自人事部的消息</span>
                                    </div>
                                    <div class="tpl-dropdown-menu-notifications-time">
                                        30分钟前
                                    </div>
                                </a>
                            </li>
                            <li class="tpl-dropdown-menu-notifications">
                                <a href="javascript:;" class="tpl-dropdown-menu-notifications-item am-cf">
                                    <div class="tpl-dropdown-menu-notifications-title">
                                        <i class="am-icon-folder-o"></i>
                                        <span> 上午开会记录存档</span>
                                    </div>
                                    <div class="tpl-dropdown-menu-notifications-time">
                                        1天前
                                    </div>
                                </a>
                            </li>


                            <li class="tpl-dropdown-menu-notifications">
                                <a href="javascript:;" class="tpl-dropdown-menu-notifications-item am-cf">
                                    <i class="am-icon-bell"></i> 进入列表…
                                </a>
                            </li>
                        </ul>
                    </li>

                    <!-- 退出 -->
                    <li class="am-text-sm">
                        <a href="/user/exit">
                            <span class="am-icon-sign-out"></span> 退出
                        </a>
                    </li>
                </ul>
            </div>
        </div>

    </header>
    <!-- 风格切换 -->
    <div class="tpl-skiner">
        <div class="tpl-skiner-toggle am-icon-cog">
        </div>
        <div class="tpl-skiner-content">
            <div class="tpl-skiner-content-title">
                选择主题
            </div>
            <div class="tpl-skiner-content-bar">
                <span class="skiner-color skiner-white" data-color="theme-white"></span>
                <span class="skiner-color skiner-black" data-color="theme-black"></span>
            </div>
        </div>
    </div>
    <!-- 侧边导航栏 -->
    <div class="left-sidebar">
        <!-- 用户信息 -->
        <div class="tpl-sidebar-user-panel">
            <div class="tpl-user-panel-slide-toggleable">
                <div class="tpl-user-panel-profile-picture">
                    <img src="${path}/resources/img/user04.png" alt="">
                </div>
                <span class="user-panel-logged-in-text">
              <i class="am-icon-circle-o am-text-success tpl-user-panel-status-icon"></i>
              禁言小张
          </span>
                <a href="javascript:;" class="tpl-user-panel-action-link"> <span class="am-icon-pencil"></span> 账号设置</a>
            </div>
        </div>


        <!-- 菜单 -->
        <ul class="sidebar-nav">
            <li class="sidebar-nav-heading">Components <span class="sidebar-nav-heading-info"> 附加组件</span></li>
            <li class="sidebar-nav-link">
                <a href="/user/main">
                    <i class="am-icon-home sidebar-nav-link-logo"></i> 首页
                </a>
            </li>
            <li class="sidebar-nav-link">
                <%
                    if (manager.getLevel() == 0) {%>
                <a href="/supermarket/list">
                        <%  }else{%>
                    <a href="#">
                        <% }
                        %>
                        <i class="am-icon-table sidebar-nav-link-logo"></i> 超市管理
                    </a>
            </li>
            <li class="sidebar-nav-link">
                <a href="/person/list">
                    <i class="am-icon-calendar sidebar-nav-link-logo"></i> 员工管理
                </a>
            </li>
            <li class="sidebar-nav-link">
                <%
                    if (manager.getLevel() == 0) {%>
                <a href="#">
                        <%  }else{%>
                    <a href="/goods/list">
                        <% }
                        %>
                        <i class="am-icon-wpforms sidebar-nav-link-logo"></i> 商品管理

                    </a>
            </li>
            <li class="sidebar-nav-link">
                <a href="/user/operation">
                    <i class="am-icon-bar-chart sidebar-nav-link-logo"></i> 管理员管理

                </a>
            </li>


        </ul>
    </div>

    <div class="am-g tpl-g">
        <!-- 风格切换 -->
        <div class="tpl-skiner">
            <div class="tpl-skiner-toggle am-icon-cog">
            </div>
            <div class="tpl-skiner-content">
                <div class="tpl-skiner-content-title">
                    选择主题
                </div>
                <div class="tpl-skiner-content-bar">
                    <span class="skiner-color skiner-white" data-color="theme-white"></span>
                    <span class="skiner-color skiner-black" data-color="theme-black"></span>
                </div>
            </div>
        </div>
        <div class="tpl-login">
            <div class="tpl-login-content">
                <div class="tpl-login-title">添加管理员</div>
                <span class="tpl-login-content-info">
                  创建一个新的管理员
              </span>


                <form class="am-form tpl-form-line-form">
                    <div class="am-form-group">
                        <input type="text" class="tpl-form-input" id="mname" placeholder="姓名">

                    </div>
                    <div class="am-form-group">
                        <input type="number" class="tpl-form-input" id="mtel" placeholder="电话">
                    </div>
                    <div class="am-form-group">
                        <input type="number" class="tpl-form-input" id="msalary" placeholder="工资">
                    </div>
                    <div class="am-form-group">
                        <input type="text" class="tpl-form-input" id="username" placeholder="用户名">
                    </div>

                    <div class="am-form-group">
                        <input type="password" class="tpl-form-input" id="password" placeholder="请输入密码">
                    </div>
                    <div class="am-form-group">
                        <select data-am-selected id="sid">

                        </select>
                    </div>
                    <div class="am-form-group tpl-login-remember-me">
                        <input id="remember-me" type="checkbox">
                        <label for="remember-me">

                            我已阅读并同意 <a href="javascript:;">《用户注册协议》</a>
                        </label>

                    </div>


                    <div class="am-form-group">

                        <button type="button"
                                class="am-btn am-btn-primary  am-btn-block tpl-btn-bg-color-success  tpl-login-btn"
                                id="doc-prompt-toggle">提交
                        </button>

                    </div>
                </form>
            </div>
        </div>
    </div>


</div>
</div>
</div>
</div>


<script src="${path}/resources/js/amazeui.min.js"></script>
<script src="${path}/resources/js/amazeui.datatables.min.js"></script>
<script src="${path}/resources/js/dataTables.responsive.min.js"></script>
<script src="${path}/resources/js/app.js"></script>
<script src="${path}/resources/js/manager/register.js"></script>


</body>

</html>