#!/usr/bin/perl -w

for $filename (@ARGV) {
    open my $file, '<', $filename or die "Can not open $filename\n";

    while ($line = <$file>) {
        if($line =~ /^(\S+)\s+\d+\s+(.*)\s*$/) {
            my $date = $1;
            my $species = $2;

            $last_seen{$species} = $date;
        } else {
            print "Sorry could not parse: $line\n";
        }
    }

    close $file;

    foreach $species (sort keys %last_seen) {
        print "$species $last_seen{$species}\n";
    }
}
