<?


$fh = fopen('JudgeInput.txt','r');
while ($whole = fgets($fh)) {
 $invalid = false;
$outOfRange = false;

$dot1 = strpos($whole, " ");
$dot2 = strpos($whole, " ", $dot1+1);


$start = substr($whole, 0, $dot1);
$end = substr($whole, $dot1 + 1, $dot2 - $dot1 - 1);
$find = substr($whole, $dot2, strlen($whole) - $dot2 - 1);


$dot1 = strpos($start, ".");
$dot2 = strpos($start, ".", $dot1+1);
$dot3 = strpos($start, ".", $dot2+1);
$dot4 = strpos($start, ".", $dot3+1);

$starts[0] = substr($start, 0, $dot1);
$starts[1] = substr($start, $dot1+1, $dot2 - $dot1 - 1);
$starts[2] = substr($start, $dot2 + 1, $dot3 - $dot2 - 1);
$starts[3] = substr($start, $dot3 + 1, strlen($start) - $dot3 - 1);


$dot1 = strpos($end, ".");
$dot2 = strpos($end, ".", $dot1+1);
$dot3 = strpos($end, ".", $dot2+1);
$dot4 = strpos($end, ".", $dot3+1);

$ends[0] = substr($end, 0, $dot1);
$ends[1] = substr($end, $dot1+1, $dot2 - $dot1 - 1);
$ends[2] = substr($end, $dot2 + 1, $dot3 - $dot2 - 1);
$ends[3] = substr($end, $dot3 + 1, strlen($end) - $dot3 - 1);



if (substr_count($find, '.') != 3) $invalid = true;


$dot1 = strpos($find, ".");
$dot2 = strpos($find, ".", $dot1+1);
$dot3 = strpos($find, ".", $dot2+1);
$dot4 = strpos($find, ".", $dot3+1);

$finds[0] = substr($find, 0, $dot1);
$finds[1] = substr($find, $dot1+1, $dot2 - $dot1 - 1);
$finds[2] = substr($find, $dot2 + 1, $dot3 - $dot2 - 1);
$finds[3] = substr($find, $dot3 + 1, strlen($find) - $dot3 - 1);



for ($i = 0 ; $i < 4 ; $i ++) {
	$intstarts[$i] = intval($starts[$i]);
	$intends[$i] = intval($ends[$i]);
	$intfinds[$i] = intval($finds[$i]);
	if (($intfinds[$i] > 255) || ($intfinds[$i] < 0)) $invalid = true;
	if (($intfinds[$i] > $intends[$i]) || ($intfinds[$i] < $intstarts[$i])) {
		if ($intfinds[$i] != 0 ) $outOfRange = true;
	}
}

if ($invalid) echo "InValid" . "<br>";
elseif ($outOfRange) echo "OutRange" . "<br>";
else echo "InRange" . "<br>";




}
fclose($fh);









?>