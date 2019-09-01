#!/usr/bin/perl -w

foreach my $n (@ARGV) {
    $count = grep {$_ == $n} @ARGV;
    $weight{$n * $count} = $n;
}
@sortedWeight = sort {$b <=> $a} keys %weight;
print "$weight{$sortedWeight[0]}\n";
