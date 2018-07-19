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
                <a href="#" class="active">
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


    <!-- 内容区域 -->
    <div class="tpl-content-wrapper">

        <div class="container-fluid am-cf">
            <div class="row">
                <div class="am-u-sm-12 am-u-md-12 am-u-lg-9">
                    <div class="page-header-heading"><span class="am-icon-home page-header-heading-icon"></span> 员工管理
                        <small>Amaze UI</small>
                    </div>
                    <p class="page-header-description">Amaze UI 有许多不同的表格可用。</p>
                </div>
                <div class="am-u-lg-3 tpl-index-settings-button">
                    <button type="button" class="page-header-button" id="doc-prompt-toggle"><span
                            class="am-icon-paint-brush"></span> 新增员工
                    </button>
                </div>
            </div>

        </div>

        <div class="row-content am-cf">


            <div class="row">

                <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
                    <div class="widget am-cf">
                        <div class="widget-head am-cf">
                            <div class="widget-title am-fl">员工列表</div>
                            <div class="widget-function am-fr">
                                <a href="javascript:;" class="am-icon-cog"></a>
                            </div>
                        </div>
                        <div class="widget-body  widget-body-lg am-fr">

                            <table width="100%" class="am-table am-table-compact am-table-striped tpl-table-black "
                                   id="example-r">
                                <thead>
                                <tr>
                                    <th>序号</th>
                                    <% if (manager.getLevel() == 0) {%>
                                    <th>所属超市</th>
                                    <%}%>
                                    <th>姓名</th>
                                    <th>电话</th>
                                    <th>职位</th>
                                    <th>工资</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody id="html">
                                <!-- more data -->

                                </tbody>
                            </table>
                        </div>

                        <%-- 上一页下一页 --%>
                        <div class="am-u-lg-12 am-cf">

                            <div class="am-fr">
                                <ul class="am-pagination tpl-pagination" id="pagination">
                                    <%-- 在这里动态插入上一页下一页 --%>
                                </ul>
                            </div>
                        </div>


                    </div>
                </div>


            </div>

        </div>
    </div>
</div>
</div>
<form enctype="multipart/form-data">
    <div class="am-modal am-modal-prompt" tabindex="-1" id="my-prompt">

        <div class="am-modal-dialog">
            <div class="am-modal-hd">新增员工信息:</div>
            <div class="am-modal-bd">
                <label for="doc-ipt-3" class="am-u-sm-2 am-form-label">姓名</label>
                <input type="text" class="am-modal-prompt-input" placeholder="姓名" id="addpname">
            </div>
            <div class="am-modal-bd">
                <label for="doc-ipt-3" class="am-u-sm-2 am-form-label">电话</label>
                <input type="number" class="am-modal-prompt-input" placeholder="电话" id="addptel">
            </div>
            <div class="am-modal-bd">
                <label for="doc-ipt-3" class="am-u-sm-2 am-form-label">工资</label>
                <input type="number" class="am-modal-prompt-input" placeholder="工资" id="addpsalary">
            </div>
            <div class="am-modal-bd">
                <label for="doc-ipt-3" class="am-u-sm-2 am-form-label">职位</label>
                <select data-am-selected id="addpposition">
                    <option value="1">保安</option>
                    <option value="2">收银员</option>
                    <option value="3">促销员</option>
                    <option value="4">采购员</option>
                </select>
            </div>
            <%if (manager.getLevel() == 0) {%>
            <div class="am-modal-bd">
                <label for="doc-ipt-3" class="am-u-sm-2 am-form-label">所属超市</label>
                <select data-am-selected id="addsid">

                </select>
            </div>
            <% }%>
            <div class="am-modal-footer">
                <span class="am-modal-btn" data-am-modal-cancel>取消</span>
                <span class="am-modal-btn" data-am-modal-confirm>提交</span>
            </div>

        </div>
    </div>
</form>


<div class="am-modal am-modal-prompt" tabindex="-1" id="my-prompt2">
    <div class="am-modal-dialog">
        <div class="am-modal-hd">修改员工信息:</div>
        <form enctype="multipart/form-data">

            <div class="am-modal-bd">
                <label for="doc-ipt-3" class="am-u-sm-2 am-form-label">姓名</label>
                <input type="text" class="am-modal-prompt-input" id="editpname">
            </div>
            <div class="am-modal-bd">
                <label for="doc-ipt-3" class="am-u-sm-2 am-form-label">电话</label>
                <input type="number" class="am-modal-prompt-input" id="editptel">
            </div>
            <div class="am-modal-bd">
                <label for="doc-ipt-3" class="am-u-sm-2 am-form-label">工资</label>
                <input type="number" class="am-modal-prompt-input" id="editpsalary">
            </div>
            <div class="am-modal-bd">
                <label for="doc-ipt-3" class="am-u-sm-2 am-form-label">职位</label>
                <select data-am-selected id="editpposition">
                    <option value="0">请选择</option>
                    <option value="1">保安</option>
                    <option value="2">收银员</option>
                    <option value="3">促销员</option>
                    <option value="4">采购员</option>
                </select>
            </div>
            <%if (manager.getLevel() == 0) {%>
            <div class="am-modal-bd">
                <label for="doc-ipt-3" class="am-u-sm-2 am-form-label">所属超市</label>
                <select data-am-selected id="editsid">

                </select>
            </div>
            <%}%>
            <div class="am-modal-footer">
                <span class="am-modal-btn" data-am-modal-cancel>取消</span>
                <span class="am-modal-btn" data-am-modal-confirm>提交</span>
            </div>
        </form>
    </div>
</div>

<div class="am-modal am-modal-confirm" tabindex="-1" id="my-confirm">
    <div class="am-modal-dialog">
        <div class="am-modal-hd">删除商品信息</div>
        <div class="am-modal-bd">
            确定要删除这条记录吗？
        </div>
        <div class="am-modal-bd">
            <input type="hidden" class="am-modal-prompt-input" id="pid" value="">
        </div>
        <div class="am-modal-footer">
            <span class="am-modal-btn" data-am-modal-cancel>取消</span>
            <span class="am-modal-btn" data-am-modal-confirm>确定</span>
        </div>
    </div>
</div>


<script src="${path}/resources/js/amazeui.min.js"></script>
<script src="${path}/resources/js/amazeui.datatables.min.js"></script>
<script src="${path}/resources/js/dataTables.responsive.min.js"></script>
<script src="${path}/resources/js/app.js"></script>
<% if (manager.getLevel() == 0) {%>
<script src="${path}/resources/js/person/superpersonlist.js"></script>
<%} else {%>
<script src="${path}/resources/js/person/personlist.js"></script>
<%}%>
<script src="${path}/resources/js/person/personadd.js"></script>


</body>

</html>