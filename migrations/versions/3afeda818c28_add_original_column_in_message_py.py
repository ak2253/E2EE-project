"""Add original column in message.py

Revision ID: 3afeda818c28
Revises: fa74b0aaaf93
Create Date: 2020-12-12 17:52:24.766218

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3afeda818c28'
down_revision = 'fa74b0aaaf93'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('message', sa.Column('original', sa.String(length=255), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('message', 'original')
    # ### end Alembic commands ###