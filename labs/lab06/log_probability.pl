#!/usr/bin/perl -w
foreach my $file (glob "lyrics/*.txt") {
    my $totalWords = 0;
    my $logFrequency;
    my $frequency;
    my $numberOfOccurrence = 0;
    my @path = split(/\//, $file);
    my @filename = split(/\./, $path[1]);
    my $artist = shift(@filename);
    $artist =~ s/_/ /g;
    $wordToCount = lc($ARGV[0]);
    open my $in, '<', $file or die;

    while (my $inputLine = <$in>) {
        chomp $inputLine;
        my $numberPerLine = 0;
        my @inputLine = split(/[^A-Za-z]/, lc($inputLine));

        foreach my $word (@inputLine) {
            $numberOfOccurrence++ if ($word eq $wordToCount);
            $numberPerLine++ if ($word);
        }
        $totalWords += $numberPerLine;
    }
    close $in;
    # additive smoothing
    $frequency = ($numberOfOccurrence + 1) / $totalWords
    if ($totalWords != 0);
    $logFrequency += log($frequency);
    printf("log((%d+1)/%6d) = %8.4f %s\n", $numberOfOccurrence, $totalWords,
          $logFrequency, $artist);
}
