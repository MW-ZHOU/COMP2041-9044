#!/usr/bin/perl -w

while ($line = <STDIN>) {
    chomp $line;
    my @fields = split /\s+/, $line;
    @fields = reverse @fields;
    $reversed_line = join ' ', @fields;
    print "$reversed_line\n";
}

# #!/usr/bin/perl -pw

# chomp;
# $_ = join ' ', reverse split;
