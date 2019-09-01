#!/usr/bin/perl -w
foreach my $file (glob "lyrics/*.txt") {
    my $numberOfOccurrence = 0;
    my $wordToCount = lc($ARGV[0]);
    my $totalWords = 0;

    open my $in, '<', $file or die;
    while (my $inputLine = <$in>) {
        chomp $inputLine;
        my $numberPerLine = 0;
        $inputLine = lc($inputLine);
        my @inputLine = split(/[^A-Za-z]/, $inputLine);

        foreach my $word (@inputLine) {
            $numberOfOccurrence++ if ($word eq $wordToCount);
            $numberPerLine++ if ($word);
        }
        $totalWords += $numberPerLine;
    }
    close $in;

    $frequency = $numberOfOccurrence / $totalWords if ($totalWords != 0);
    @path = split(/\//, $file);
    @filename = split(/\./, $path[1]);
    $artist = shift(@filename);
    $artist =~ s/_/ /g;
    printf("%4d/%6d = %.9f %s\n", $numberOfOccurrence, $totalWords, $frequency,
           $artist);
}
