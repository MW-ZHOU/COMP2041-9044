#!/usr/bin/perl

if (@ARGV < 1) {
    die "Usage: ex3 Course\n";
} else {
    $c = $ARGV[0];
}

while (<STDIN>) {
    chomp;
    my ($sid,$course,$year,$sess,$mark,$grade) = split;

    if ($course eq $c) {
        $sum{"$year $sess"} += $mark;
        $count{"$year $sess"}++;
        $nofferings++;
    }
}

if ($nofferings == 0) {
    print "No marks for course $c\n";
} else {
    foreach $s (sort keys %sum) {
        printf "$c $s %0.1f\n", $sum{"$s"}/$count{"$s"};
    }
}
