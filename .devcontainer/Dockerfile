FROM debian:latest
ENV DEBIAN_FRONTEND="noninteractive"
RUN apt update && apt install -y git curl wget sudo procps zsh tar screen procps lsb-release

# Install latest node
RUN curl -sL https://deb.nodesource.com/setup_current.x | bash - && \
  apt install -y nodejs

# Install Docker and Docker Compose
VOLUME [ "/var/lib/docker" ]
RUN curl https://get.docker.com | sh && \
  compose_version=$(wget -qO- https://api.github.com/repos/docker/compose/releases/latest | grep tag_name | cut -d '"' -f 4); \
  wget -q https://github.com/docker/compose/releases/download/${compose_version}/docker-compose-`uname -s`-`uname -m` -O /usr/local/bin/docker-compose && \
  chmod +x -v /usr/local/bin/docker-compose

# Add non root user
ARG USERNAME=gitpod
ARG USER_UID=1000
ARG USER_GID=$USER_UID
RUN \
  groupadd --gid $USER_GID $USERNAME && \
  adduser --disabled-password --gecos "" --shell /usr/bin/zsh --uid $USER_UID --gid $USER_GID $USERNAME && \
  usermod -aG sudo $USERNAME && echo "$USERNAME ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers.d/$USERNAME && \
  chmod 0440 /etc/sudoers.d/$USERNAME && \
  usermod -aG docker $USERNAME

USER $USERNAME
WORKDIR /home/$USERNAME

# Install oh my zsh
RUN yes | sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)" && \
  git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ~/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting && \
  git clone https://github.com/zsh-users/zsh-autosuggestions ~/.oh-my-zsh/custom/plugins/zsh-autosuggestions && \
  sed -e 's|ZSH_THEME=".*"|ZSH_THEME="strug"|g' -i ~/.zshrc && \
  sed -e 's|plugins=(.*)|plugins=(git docker zsh-syntax-highlighting zsh-autosuggestions)|g' -i ~/.zshrc

# Create Start Script
ARG DOCKERD_ARGS=""
RUN (\
echo "#""!/bin/bash";\
echo "set -e";\
echo "if [ -f '/var/run/docker.sock' ]; then";\
echo "  sh -c \"\$@\"";\
echo "  while (ps -ef | grep -v grep | grep -q dockerd); do sleep 8s; done";\
echo "  echo Dockerd stopped";\
echo "  exit 2";\
echo "elif ! [[ -z \"\$@\" ]]; then";\
echo "  (sudo dockerd $DOCKERD_ARGS) &";\
echo "  sh -c \"\$@\"";\
echo "  while (ps -ef | grep -v grep | grep -q dockerd); do sleep 8s; done";\
echo "  echo Dockerd stopped";\
echo "  exit 2";\
echo "else";\
echo "  (sudo dockerd $DOCKERD_ARGS) &";\
echo "  while (ps -ef | grep -v grep | grep -q dockerd); do sleep 8s; done";\
echo "  echo Dockerd stopped";\
echo "  exit 2";\
echo "fi";\
)|sudo tee /usr/local/bin/start.sh && sudo chmod +x /usr/local/bin/start.sh

# Start Docker Engine
ENTRYPOINT [ "/usr/local/bin/start.sh" ]