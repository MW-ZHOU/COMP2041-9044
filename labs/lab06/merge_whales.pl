#!/usr/bin/perl -w

for my $filename (@ARGV) {
    open my $file, '<', $filename or die "Can not open $filename\n";
    my $current_date = "";
    my $current_count = 0;
    my $current_species = "";

    while ($line = <$file>) {
        if ($line =~ /^(\S+)\s+(\d+)\s+(.*)\s*$/) {
            my $date = $1;
            my $count = $2;
            my $species = $3;

            if ($species eq $current_species && $date eq $current_date) {
                $current_count += $count;
            } else {
                print "$current_date $current_count $current_species\n" if $current_count;
                $current_date = $date;
                $current_count = $count;
                $current_species = $species;
            }
        } else {
            print "Sorry could not parse: $line\n";
        }
    }
    print "$current_date $current_count $current_species\n" if $current_count;
    close $file;
}
