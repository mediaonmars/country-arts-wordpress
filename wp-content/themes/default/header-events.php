<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
  <head>
    <meta content='text/html; charset=UTF-8' http-equiv='Content-Type' />
    <title>Country Arts WA</title>
    <link href='<?php bloginfo('stylesheet_url'); ?>' rel='stylesheet' type='text/css' />
    <script src='/javascripts/lib.js' type='text/javascript'></script>
    <script src='/javascripts/jquery-1.6.2.min.js' type='text/javascript'></script>
    <script src='/javascripts/application.js' type='text/javascript'></script>
    <script src='/javascripts/script.js' type='text/javascript'></script>
    <script src='/javascripts/marsfx.js' type='text/javascript'></script>
    <?php wp_head(); ?>
  </head>
  <body>
    <div id='header-page'>
      <!-- Top navigation on top of the images -->
      <div id='nav-outer'>
        <div id='navigation'>
          <div id='menu'>
            <ul>
              <?php wp_list_pages('sort_column=menu_order&depth=2&title_li=');?>
            </ul>
          </div>
          <!-- menu -->
          <div id='search'>
            <form>
              <input class='mars-search-clear' id='searchtxt' type='text' value='Search' />
              <input class='searchbtn' type='submit' value='' />
            </form>
          </div>
          <!-- search -->
        </div>
        <!-- navavigation -->
      </div>
      <!-- nav-outer -->
    </div>
    <!-- header-page -->
    <div id='content'>
      <div id='breadcrumbs'>
        You are here:
        <?php if (function_exists('dimox_breadcrumbs')) dimox_breadcrumbs(); ?>
      </div>
      <div id='sidebar'>
        <div class='sidebar-header'>
          <h3>Categories</h3>
        </div>
        <div class='sidebar-main'>
          <ul>
            <li>
              <a href='#'>lksjdflgjsdf</a>
            </li>
            <li>ssdfgsdfg</li>
            <li>sdfgsdg</li>
            <li>sdfg</li>
            <li>sfgddfgsdfg</li>
          </ul>
        </div>
        <!-- sidebar-main -->
        <div class='sidebar-footer'></div>
      </div>
      <!-- sidebar -->
      <div id='page-content'>
        