#!/usr/bin/perl -w
@input = <STDIN>;

@numbers = split /\D+/, join(' ', @input);
$i = 0;
$i++ while $i < $#numbers && $numbers[$i] < $numbers[$i + 1];
$j = $#numbers;
$j-- while $j > 0 && $numbers[$j] < $numbers[$j - 1];
print "not " if $i != $j || $i == 0 || $j == $#numbers;
print "hill\n";
