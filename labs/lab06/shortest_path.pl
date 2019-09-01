#!/usr/bin/perl -w

die "Usage: $0 <start> <finish>\n" if @ARGV != 2;
$start = $ARGV[0];
$finish = $ARGV[1];

while ($line = <STDIN>) {
    $line =~ /^(\S+)\s+(\S+)\s+(\d+)$/;
    next if !$line;
    $distance{$1}{$2} = $3;
    $distance{$2}{$1} = $3;
}

$shortest_journey{$start} = 0;
# path
$route{$start} = "";
# mark every town as unprocessed
@unprocessed_towns = keys %distance;
$current_town = $start;

while ($current_town && $current_town ne $finish) {
    # remove current_town from unprocessed_towns
    @unprocessed_towns = grep {$_ ne $current_town} @unprocessed_towns;
}
