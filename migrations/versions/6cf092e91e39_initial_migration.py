"""Initial migration.

Revision ID: 6cf092e91e39
Revises: 
Create Date: 2020-11-15 16:59:43.015045

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6cf092e91e39'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('login',
    sa.Column('username', sa.String(length=255), nullable=False),
    sa.Column('password', sa.String(length=255), nullable=True),
    sa.PrimaryKeyConstraint('username')
    )
    op.create_table('message',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username_to', sa.String(length=255), nullable=True),
    sa.Column('username_from', sa.String(length=255), nullable=True),
    sa.Column('message', sa.String(length=500), nullable=True),
    sa.Column('time_sent', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=255), nullable=True),
    sa.Column('registration_datetime', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('username')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user')
    op.drop_table('message')
    op.drop_table('login')
    # ### end Alembic commands ###