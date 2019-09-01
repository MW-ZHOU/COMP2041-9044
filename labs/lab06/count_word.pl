#!/usr/bin/perl -w
# change the input into lowercase
my $wordToCount = lc $ARGV[0];
my $numberOfOccurrence = 0;
while (my $inputLine = <STDIN>) {
    chomp $inputLine;
    $inputLine = lc $inputLine;
    my @listOfWords = split(/[^A-Za-z]/, $inputLine);
    foreach my $word (@listOfWords) {
        $numberOfOccurrence++ if ($word eq $wordToCount);
    }
}
print "$wordToCount occurred $numberOfOccurrence times\n";
