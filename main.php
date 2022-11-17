<?php

$filename = __DIR__ . '/src/engwords.txt';
$array = file($filename, FILE_IGNORE_NEW_LINES);

$arr_len = [];
foreach ($array as $key => $value) {
    $arr_len[$key] = strlen($value);
}

$arr_len_uniq = array_values(array_unique($arr_len, SORT_NUMERIC));
$arr_len_sort = [];

for ($i=0; $i < count($arr_len_uniq); $i++) { 
    $arr_len_sort[ $arr_len_uniq[$i] ] = [];
    foreach ($arr_len as $key => $value) {
        if($arr_len_uniq[$i] == $value){
            array_push($arr_len_sort[ $arr_len_uniq[$i] ], $key);
        }
    }
}
ksort($arr_len_sort);
//5 6 7 8 9 10 11 12 13 14 15 16
// use a string length of 8
$arr_words = [];
$count_words = 5;
$random_arr_values = [];
$password_arr = [];

foreach ($arr_len_sort as $key => $value_arr) {
    // echo 'Длинна строки = ' . $key . PHP_EOL;
    // echo '<br>';

    if($key == 8){
        for ($i=0; $i < count($value_arr); $i++) { 
            // echo '<br>';
            // echo $array[$value_arr[$i]] . PHP_EOL;
            array_push($arr_words, $array[$value_arr[$i]]);
        }
    }
    
}

for ($i=0; $i < $count_words; $i++) { 
    $key = rand(0, count($arr_words));
    // $word = str_replace('\r\n', '', $arr_words[$key]);
    $word = $arr_words[$key];
    if( !in_array($word, $password_arr) ) array_push($password_arr, $word);
}

$password_word = rand(0, count($password_arr) - 1);
$password_word = $password_arr[$password_word];
array_push($password_arr, $password_word);
// $password_arr[10] = $password_word;
// print_r($password_arr);
// print_r($password_word);
$password_arr = json_encode($password_arr);

// // Удаление управляющих символов
// for ($i = 0; $i <= 31; ++$i) { 
// 	$password_arr = str_replace(chr($i), '', $password_arr); 
// }
 
// // Удаление символа Delete
// $password_arr = str_replace(chr(127), '', $password_arr);
 
// // Удаление BOM
// if (0 === strpos(bin2hex($password_arr), 'efbbbf')) {
//    $password_arr = substr($password_arr, 3);
// }

// $res = json_decode($password_arr, true);

header('Content-Type: application/json');
// $text = str_replace("\r\n", "", $password_arr);
echo $password_arr;
exit();

// array_push($arr_len, strlen($value) );
    // $arr_len += strlen($value);
    // print_r(strlen($value));
    // echo PHP_EOL;


// $inputs = '';

//     for ($i=0; $i < count($password_arr); $i++) { 
//         $inputs .= '<input type="submit" name="' . $i . '" value="' . $password_arr[$i] . '" />';
//     }

//     $form = '<form action="" method="post">' . $inputs . '</form>';
