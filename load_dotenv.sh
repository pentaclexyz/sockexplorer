if [ ! -f $1 ]
then
  export $(cat $1 | xargs)
fi