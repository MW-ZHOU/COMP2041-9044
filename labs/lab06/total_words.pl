#!/usr/bin/perl -w
my $totalNumber = 0;
while (my $inputLine = <STDIN>) {
    my $numberPerLine = 0;
    my @inputLine = split(/[^A-Za-z]/, $inputLine);
    foreach my $word (@inputLine) {
        $numberPerLine++ if ($word);
    }
    $totalNumber += $numberPerLine;
}
print "$totalNumber words\n";
