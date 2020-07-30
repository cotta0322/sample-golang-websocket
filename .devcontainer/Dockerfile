FROM node:14.1.0-buster
    ENV GOLANG_INSTALLER_URI=https://dl.google.com/go/
    ENV GOLANG_INSTALLER_FILE=go1.14.2.linux-amd64.tar.gz
    ENV PATH $PATH:/usr/local/go/bin

    RUN cd /tmp/ && \
        wget $GOLANG_INSTALLER_URI$GOLANG_INSTALLER_FILE && \
        tar -C /usr/local -xzf $GOLANG_INSTALLER_FILE


