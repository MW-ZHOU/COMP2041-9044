#！/usr/bin/perl -w
# there are perl
foreach $url (@ARGV) {
    open my $f, '-|', "wget -q -O $url" or die;
    while ($line = <$f>) {
        @numbers = split /[^\d\- ]/, $line;
        foreach $number (@numbers) {
            $number =~ s/\D//g;
            print "$number\n" if length $number >= 8 && length $number <= 15;
        }
    }
    close $f;
}
