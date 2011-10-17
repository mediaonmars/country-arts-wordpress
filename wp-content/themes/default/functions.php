<?php

function get_events_json_by_category($events_per_category) {
  $aec = $GLOBALS['aec'];
  $categories = $aec->db_query_categories();
  $categories_events = array();
  foreach ($categories as $category) {
    $categories_events[$category->category] = array("id" => $category->id, "events" => array());
  }
  foreach ($categories as $category) {
    $events = $aec->db_query_events(date('Y-m-d'), 
                    date('Y-m-d', mktime(0, 0, 0, date("m"), date("d"), date("Y")+1)),
              $category->id, false, 5);
    $categories_events[$category->category]["events"] = $events;

    //$events = $aec->db_query_events_by_category($category->id);
    //$categories_events[$category->category] = $events;
  }
  return json_encode($categories_events);
}

?>