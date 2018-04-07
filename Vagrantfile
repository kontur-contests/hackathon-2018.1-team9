VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  config.vm.box = "ubuntu/trusty64-daily-1"
  config.vm.box_url = "https://cloud-images.ubuntu.com/vagrant/trusty/current/trusty-server-cloudimg-amd64-vagrant-disk1.box"


  config.vm.network "forwarded_port", guest: 80, host: 8085
  config.vm.network "forwarded_port", guest: 9200, host: 9200


  config.vm.provider :virtualbox do |vb|
      vb.customize ["modifyvm", :id, "--ostype", "Ubuntu_64"]
      vb.customize ["modifyvm", :id, "--memory", 2568]
      vb.customize ["modifyvm", :id, "--cpus", "3"]
      vb.customize ["modifyvm", :id, "--natdnsproxy1", "on"]
      vb.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
  end

  config.vm.provision :shell, :path => "vagrant_provision/bootstrap.sh"

end