echo "Provisioning virtual machine..."

echo "Install Docker"
apt-get update
apt-get install apt-transport-https ca-certificates  -y > /dev/null
apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
