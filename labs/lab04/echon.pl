#!/usr/bin/perl -w
die "Usage: ./echon.pl <number of lines> <string>\n" if @ARGV != 2;
die "./echon.pl: argument 1 must be a non-negative integer\n" if $ARGV[0] =~ /\D+/;
while ($ARGV[0] > 0) {
	print "$ARGV[1]\n";
	$ARGV[0] -= 1;
}
