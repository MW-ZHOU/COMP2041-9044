#!/usr/bin/perl -w

# map letters to counts

my %letterCount;

while($line = <STDIN>) {
    chomp $line;

    # remove anything but letters and numbers
    $line =~ s/[^A-Za-z0-9]//g;

    # split the line into an array of characters
    @chars = split //, $line;
    foreach my $letter (@chars) {
        # record count in hash table
        $letterCount{$letter}++;
    }
}

# output count of each letter, sorted on the keys (letters)
foreach my $letter (sort keys %letterCount) {
    print "'$letter' occurred $letterCount{$letter} times\n";
}
