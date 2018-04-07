if [ -f "/.bootstrap.done" ]; then
    service apache2 restart
    service elasticsearch restart
    exit
fi

DEBIAN_FRONTEND=noninteractive apt-get -y install software-properties-common python-software-properties
DEBIAN_FRONTEND=noninteractive apt-get -y update
DEBIAN_FRONTEND=noninteractive apt-get -y install nginx

curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
DEBIAN_FRONTEND=noninteractive apt-get -y install nodejs


touch /.bootstrap.done