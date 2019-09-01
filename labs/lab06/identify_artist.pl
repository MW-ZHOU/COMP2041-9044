#!/usr/bin/perl -w
my %artistWordsFreq;
my %artistTotalWords;
foreach my $file (glob "lyrics/*.txt") {
    my $totalWords = 0;
    @path = split(/\//, $file);
    @filename = split(/\./, $path[1]);
    my $artist = shift(@filename);
    $artist =~ s/_/ /g;

    open my $in, '<', $file or die;
    while (my $inputLine = <$in>) {
        chomp $inputLine;
        my $numberPerLine = 0;
        $inputLine = lc($inputLine);
        my @inputLine = split(/[^A-Za-z]/, $inputLine);

        foreach my $word (@inputLine) {
            $numberPerLine++ if ($word);
            if (! $artistWordsFreq{$artist}{$word}) {
                $artistWordsFreq{$artist}{$word} = 1;
            } else {
                $artistWordsFreq{$artist}{$word}++;
            }
        }
        $totalWords += $numberPerLine;
    }
    close $in;
    $artistTotalWords{$artist} = $totalWords;
}

my %wordsInSong;
foreach my $file (@ARGV) {
    open my $SONG, '<', "$file" or die;
    while (my $inputLine = <$SONG>) {
        chomp $inputLine;
        $inputLine = lc($inputLine);
        my @inputLine = split(/[^A-Za-z]/, $inputLine);
        foreach my $word (@inputLine) {
            next unless ($word);
            if (! $wordsInSong{$file}{$word}) {
                $wordsInSong{$file}{$word} = 1;
            } else {
                $wordsInSong{$file}{$word}++;
            }
        }
    }
    close $SONG;
    my $maxSimilarity;
    my %artistSimilarity;
    my $bestMatch;
    foreach my $artist (sort keys %artistTotalWords) {
        my $similarity = 0;
        for my $word (sort keys %{$wordsInSong{$file}}) {
            # for words that do not occur in the words list of an artist,
            # give it an initial value of 0
            unless ($artistWordsFreq{$artist}{$word}) {
                $artistWordsFreq{$artist}{$word} = 0;
            }
            $similarity += log(($artistWordsFreq{$artist}{$word} + 1) / $artistTotalWords{$artist}) * $wordsInSong{$file}{$word};
        }
        unless (defined $maxSimilarity) {
            $maxSimilarity = $similarity;
            $bestMatch = $artist;
        } elsif ($similarity > $maxSimilarity) {
            $maxSimilarity = $similarity;
            $bestMatch = $artist;
        }
    }
    printf("%s most resembles the work of %s (log-probability=%.1f)\n", $file, $bestMatch, $maxSimilarity);
}
