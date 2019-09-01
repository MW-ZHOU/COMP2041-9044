# #!/usr/bin/perl -w
@lines = <STDIN>;
@numbers = split /\D+/, join(' ', @lines);
# start from 0 and stop at one before the last index
foreach my $i (0..$#numbers-1) {
    if ($numbers[$i] <= $numbers[$i+1]) {
        print "not converging\n";
        exit;
    }
}
# start from 2 and stop at the last index
foreach my $i (2..$#numbers) {
    if ($numbers[$i-2] - $numbers[$i-1] <= $numbers[$i-1] - $numbers[$i]) {
        print "not converging\n";
        exit;
    }
}
print "converging\n";
